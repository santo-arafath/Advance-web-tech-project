// pages/expert/AllExperts.js
import Layout from '../components/chatlayout';
import Title from '../components/title';
import ExpertSearch from '../components/UserId';
import axios from 'axios';

const AllExperts = ({ experts, error }) => {
  return (
    <>
      <Title page="All Experts" />
      <Layout>
        <div>
          <h1>All Experts</h1>
          <div>
            <ExpertSearch />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <table className="border-collapse border w-full mt-4">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-100 border">ID</th>
                <th className="p-3 font-bold uppercase bg-gray-100 border">Username</th>
                <th className="p-3 font-bold uppercase bg-gray-100 border">Address</th>
                <th className="p-3 font-bold uppercase bg-gray-100 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {experts.map((expert) => (
                <tr key={expert.id}>
                  <td className="p-3 border">{expert.id}</td>
                  <td className="p-3 border">{expert.username}</td>
                  <td className="p-3 border">{expert.address}</td>
                  <td className="p-3 border">{expert.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/AllExperts');
    const experts = response.data;

    return {
      props: {
        experts,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching experts:', error);

    return {
      props: {
        experts: [],
        error: 'Error fetching experts. Please try again.',
      },
    };
  }
}

export default AllExperts;
