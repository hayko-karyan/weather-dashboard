import { GetServerSideProps } from "next";

const Home = () => {
  // return (
  //   <main className="min-h-screen">
  //     <Header />
  //     <Search />
  //   </main> 
  // );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/weather",
      permanent: false,
    },
  };
};

export default Home;

