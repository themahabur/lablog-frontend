import { LoginForm } from "@/components/modules/Auth/login-form"
import { userService } from "@/services/user.service";

export default   async function Page() {

  const result = await userService.getSession();
  

  console.log(result);
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10  bg-zinc-50 ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
