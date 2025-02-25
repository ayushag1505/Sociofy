import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext() ;


  const { mutateAsync: signInAccount } = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({email: values.email, password: values.password})
    // console.log("session: ", session);

    if(!session?.$id) {
      // console.log(session);
      toast({
        title: "Sign In Failed. Please Try Again.",
      })
      navigate('/sign-in')
      return ;
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast({
        title: "Sign In Failed. Please Try Again.",
      })
    }

  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex-center flex-row space-x-2">
          <img src="/assets/images/logo.png" alt="logo"/>
          <h2>Sociofy</h2>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to Your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please Enter Your Details</p>
      

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? 
              <div className="flex-center gap-2">
                <Loader/>Loading...
              </div>
             : "Sign In"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Didn't have an account? <Link to="/sign-up" className="text-primary-500 text-small-bold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm