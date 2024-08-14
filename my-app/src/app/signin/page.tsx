const Signin = () => {

  return (
    <div className="flex h-screen items-center justify-center bg-teal1">
      <div className="p-10 rounded-md block ml-[10%] mr-[10%] bg-slate-50 drop-shadow-md">
        <h1>Sign up</h1>
        <form className="p-2">
          <label for="email" className="block">E-Mail</label>
          <input type="text" name="email" className="block pl-1 border-[1px] border-orange1 rounded-sm"/>
          <br/>
          <label for="password" className="block">Password</label>
          <input type="password" name="password" className="block pl-1 rounded-sm border-[1px] border-orange1"/>
          <br/>
          <button type="submit" className="w-full p-1 rounded-sm bg-orange1 hover:bg-orange3 active:bg-teal1 transition-colors duration-500">Sign Up</button>
        </form>
      </div>

    </div>
  )
}

export default Signin