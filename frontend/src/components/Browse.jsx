import Job from "./Job";
import Navbar from "./shared/Navbar";

const randomJobs = [1, 2, 3,4,5,6];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3">
          {randomJobs.map((job, index) => {
            return (
              <>
                <Job key={index} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
