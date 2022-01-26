import UserCard from "../components/User/UserCard";

const Home = () => {

  return (
    <>
      <div className='container d-flex justify-content-center py-4'>
        {/* render the User card */}
        <UserCard></UserCard>
      </div>

    </>
  )
}

export default Home;