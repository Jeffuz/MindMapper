const Signup = () => {

  return (
    <div className="flex h-screen items-center justify-center bg-teal1">
      <div className="p-5 md:p-10 rounded-md block ml-[10%] mr-[10%] bg-slate-50 drop-shadow-md">
      <h1 className="text-md md:text-2xl">Sign Up</h1>
        <form action="/api/signup" method="POST" className="p-2">
          <label for="email" className="lg:text-lg text-sm block">E-Mail</label>
          <input type="text" name="email" className="block pl-1 border-[1px] border-orange1 rounded-sm"/>
          <br/>
          <label for="password" className="lg:text-lg text-sm block">Password</label>
          <input type="password" name="password" className="block pl-1 rounded-sm border-[1px] border-orange1"/>
          <br/>
          <button type="submit" className="w-full lg:text-lg text-sm p-1 rounded-sm bg-orange1 hover:bg-orange3 active:bg-teal1 transition-colors duration-500">Sign Up</button>
        </form>
      </div>

    </div>
  )
}

export default Signup