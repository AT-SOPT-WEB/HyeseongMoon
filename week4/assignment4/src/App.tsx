function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        🎉 Welcome to Your Tailwind Project!
      </h1>

      <p className="text-lg text-gray-600 mb-8 text-center">
        이 프로젝트는 <span className="font-semibold text-blue-500">Tailwind CSS</span>만으로 구성되어 있습니다.
      </p>

      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow">
        시작하기
      </button>
    </div>
  );
}

export default App;
