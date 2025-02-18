function OurAchievements() {
  return (
    <div className="py-6 md:py-12">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">10+ Years</h3>
            <p className="text-gray-600">Experience in the industry</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              500+ Clients
            </h3>
            <p className="text-gray-600">Satisfied with our services</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              1000+ Projects
            </h3>
            <p className="text-gray-600">Successfully delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurAchievements;
