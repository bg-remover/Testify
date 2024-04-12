import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    title: '3 Sum Problem',
    difficulty: 'Medium',
  },
  {
    id: 2,
    title: 'Two Sum Problem',
    difficulty: 'Easy',
  },
  {
    id: 3,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
  },
];

const solvedQuestions = [1];
const Practice = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>
        <ul>
          {questions.map((question, index) => (
            <li key={question.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{`${index + 1}. ${question.title}`}</p>
                  <p className="text-sm text-gray-500">{`Difficulty: ${question.difficulty}`}</p>
                </div>
                {solvedQuestions.includes(question.id) ? (
                  <span className="text-green-500 font-semibold">Solved</span>
                ) : (
                  <Link
                    to={`/questions/${question.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Solve
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Practice;
