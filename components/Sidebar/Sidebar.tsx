import Image from 'next/image';

function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start w-64 p-2 fixed h-full">
      <div className="flex justify-items-center items-center w-14 h-14">
        <Image alt="logo" src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <p className="text-blue-800">test</p>
      <p className="text-blue-800">test</p>
      <p className="text-blue-800">test</p>
      <p className="text-blue-800">test</p>
      <p className="text-blue-800">test</p>
    </div>
  );
}

export { Sidebar };
