import { useFormik } from 'formik'
import Input from '../components/Input'
import * as Yup from 'yup'
import Button from '../components/Button'
import Image from 'next/image'
import illustration from '/public/illustrations/male_solo_traveling.png'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import Link from 'next/link'

const SignUp = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Please enter an email'),
      password: Yup.string()
        .min(8, 'Password length must be atleast 8')
        .required('Please enter the password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match!')
        .required('Please enter the confirm password'),
    }),
  })

  return (
    <main className='flex items-center gap-16 py-12'>
      <div className='mx-auto flex max-w-full flex-col gap-8 lg:mx-0 lg:flex-1'>
        <h2 className='text-center font-volkhov text-2xl font-bold md:gap-4 md:text-3xl lg:text-4xl'>
          Sign Up
        </h2>
        <form className='flex flex-col gap-4'>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            onBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            value={formik.values.email}
            error={
              formik.touched.email &&
              formik.errors.email && [true, formik.errors.email]
            }
          />
          <Input
            type='password'
            name='password'
            placeholder='Enter Password'
            onBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            value={formik.values.password}
            error={
              formik.touched.password &&
              formik.errors.password && [true, formik.errors.password]
            }
          />
          <Input
            type='password'
            name='confirmPassword'
            placeholder='Enter Confirm Password'
            onBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword && [
                true,
                formik.errors.confirmPassword,
              ]
            }
          />
          <Button
            text='Sign Up'
            title='sign up'
            className='mx-auto mt-4 w-fit'
          />
        </form>
        <div className='flex items-center justify-between gap-4'>
          <hr className='flex-1' />
          or
          <hr className='flex-1' />
        </div>
        <div className='flex items-center justify-between gap-8'>
          <button className='flex w-fit flex-1 items-center justify-center gap-2 rounded-md border border-dark py-3 px-4'>
            <FaGoogle />
            Continue with Google
          </button>
          <button className='flex w-fit flex-1 items-center justify-center gap-2 rounded-md border border-dark py-3 px-4'>
            <FaFacebook />
            Continue with Google
          </button>
        </div>
        <p className='mx-auto'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-brand hover:border-b hover:border-brand'
          >
            Log In
          </Link>
        </p>
      </div>
      <Image
        src={illustration}
        className='hidden max-w-[50%] flex-1 self-center lg:block'
      />
    </main>
  )
}

export default SignUp
