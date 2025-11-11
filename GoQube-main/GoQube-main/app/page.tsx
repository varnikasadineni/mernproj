import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div style={{backgroundImage: "url('/landing.jpg')"
        ,backgroundRepeat:'no-repeat'
        ,backgroundSize: 'cover'
        ,backgroundPosition:'center'
      }} className="h-[100vh] relative">


    <div className=" flex flex-col bg-black/90 shadow-2xl shadow-[inset_0_0_50px_rgba(59,130,246,0.4)] justify-center items-center h-[70vh] absolute w-[85vh] rounded-[60vh] " style={{top:0, left:0, bottom:0, right:0, margin:'auto', padding: 'auto' }}>

      <div className="flex flex-row items-baseline mb-4 italic ">
        <h1 className="pr-9 text-8xl font-bold">WELCOME</h1>
        <h1 className="text-4xl font-semibold italic"> to the </h1>
      </div>
        <h1 className="pr-3 text-5xl font-bold italic mb-20 mt-3"> EVENT SEARCH </h1>
      <Link href="/main">
        <button className=" font-semibold border-2 p-5 rounded-4xl text-3xl italic "  >
          Get  started!!!  
        </button>
      </Link>
    </div>
    </div>
    </>
  );
}
