import Header from './header';
import Editor from './components/Editor/editor';

 function Home() {

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center gap-5">
        <Editor />
      </main>
    </>
  )
}

export default Home;