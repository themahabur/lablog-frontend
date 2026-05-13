import { LoginForm } from "@/components/modules/Auth/login-form"

export default   async function Page() {

  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10  bg-zinc-50 ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
