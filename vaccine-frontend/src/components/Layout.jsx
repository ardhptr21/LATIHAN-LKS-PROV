import Navbar from './Navbar';

export default function Layout({ children, title = 'Page Title', subtitle }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className='bg-gray-100 px-32 py-20 space-y-3'>
          <h1 className='text-5xl'>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className='px-32 py-10'>{children}</div>
      </main>
    </>
  );
}
