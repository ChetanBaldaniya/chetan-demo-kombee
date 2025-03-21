import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewUser, updateUserData } from '../../redux/features/userSlice';
import { RootState } from '../../redux/store';
import { Notifications } from '../../utils/notification';
import { getUserDetails } from '../../services/action/user';
import { fetchRoles } from '../../redux/features/roleSlice';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  dob: string;
  gender: string;
  profile: File | null;
  status: boolean;
  userGalleries: File[];
  userPictures: File[];
}
interface Role {
  guard_name: string;
  id: string;
  landing_page: string;
  name: string;
}

const CreateUserForm: React.FC = ()  => {
  const { register, handleSubmit,setValue, formState: { errors } } = useForm<FormData>();
  const { role } = useSelector((state: RootState) => state.role);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>();
  

useEffect(()=>{
 if(id?.length){
  getUserDetails(id).then((res)=>{
    const editData = res.data
      setValue("name", editData.name);
      setValue("email", editData.email);
      setValue("dob", editData.dob);
      setValue("gender", editData.gender_text);
      setValue("role", editData.role_id);
      setValue("status", editData.status === "1" ? true : false);
  })
}
},[id])

 useEffect(() => {
  getRole()
  }, []);

  const getRole=async()=>{
    await dispatch(fetchRoles({ page: 1, per_page: 10 }) as any)
  }

  const onSubmit: SubmitHandler<FormData> = async (formData, e) => {
      const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('email', formData.email);
    newFormData.append('role_id', formData.role);
    newFormData.append('dob', formData.dob);
    newFormData.append('password', formData.password);
    newFormData.append('gender', (formData.gender == "Male" ? 1 : 0).toString());
    newFormData.append('status', (formData.status ? 1 : 0).toString());
    // if (formData.profile){
    //    newFormData.append('profile', formData.profile[0]);
    // }
    if (formData.profile) {
      Array.from(formData.userGalleries).forEach((file: File) => {
        newFormData.append('profile', file);
      });
    }
    if (formData.userGalleries) {
      Array.from(formData.userGalleries).forEach((file: File) => {
        newFormData.append('user_galleries[]', file);
      });
    }
  
    if (formData.userPictures) {
      Array.from(formData.userPictures).forEach((file: File) => {
        newFormData.append('user_pictures[]', file);
      });
    }
 if(id?.length){
  try {
    const resultAction = await dispatch(updateUserData({ id, formData : newFormData}) as any);

    if (updateUserData.fulfilled.match(resultAction)) {
        Notifications("success", "User updated successfully");
        e?.target.reset();
        navigate("/user");
    } else {
        console.error('Failed to update user:', resultAction.error.message);
    }
} catch (error) {
    console.error('API error:', error);
}
 }else{
  try {
    const resultAction = await dispatch(createNewUser(newFormData) as any);

    if (createNewUser.fulfilled.match(resultAction)) {
        Notifications("success","User created successfully")
        e?.target.reset(); 
        navigate("/user")
    } else {
        console.error('Failed to create user:', resultAction.error.message);
    }
} catch (error) {
    console.error('API error:', error);
}
 }
  
  };

  const handleUserNavigate = () => {
    navigate("/user")
  };

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? "Update Admin user" :" Create Admin User"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div>
          <input {...register('name', { required: 'Name is required' })} placeholder="Name*" className={`border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full`} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register('email', { required: 'Email is required' })} placeholder="Email*" className={`border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full`} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password*" className={`border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full`} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <select {...register('role', { required: 'Role is required' })} className={`border-b ${errors.role ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}>
            <option value="">Select Role*</option>
            {role?.map((role:Role) =><option value={role?.id}>{role?.name}</option>)}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <div>
          <input {...register('dob', { required: 'DOB is required' })} type="date" className={`border-b ${errors.dob ? 'border-red-500' : 'border-gray-300'} p-2 w-full`} />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        <div>
          <input {...register('profile', { required:id?.length ? false : 'Profile is required' })} type="file" className={`border-b ${errors.profile ? 'border-red-500' : 'border-gray-300'} p-2 w-full`} />
          {errors.profile && <p className="text-red-500 text-sm">{errors.profile.message}</p>}
        </div>
        <div>
        <div className="flex items-center gap-4">
          <label>Gender*</label>
          <input {...register('gender', { required: 'Gender is required' })} type="radio" value="Female" /> Female
          <input {...register('gender', { required: 'Gender is required' })} type="radio" value="Male" /> Male
        </div>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>
        <div>
        <div className="flex items-center gap-4">
          <label>Status*</label>
          <input {...register('status', { required:id?.length ? false : 'Status is required' })} type="checkbox" /> Active
        </div>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
        <div>
          <input {...register('userGalleries',{ required: id?.length ? false : 'userGalleries is required' })} type="file" multiple className="border-b border-gray-300 p-2 w-full" />
          {errors.userGalleries && <p className="text-red-500 text-sm">{errors.userGalleries.message}</p>}
        </div>

        <div>
          <input {...register('userPictures',{ required: id?.length ? false :'userPictures is required' })} type="file" multiple className="border-b border-gray-300 p-2 w-full" />
          {errors.userPictures && <p className="text-red-500 text-sm">{errors.userPictures.message}</p>}
        </div>

        <div className="col-span-2 flex gap-4">
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md">Submit</button>
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={()=> handleUserNavigate()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;