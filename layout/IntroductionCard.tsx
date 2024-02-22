export default function IntroductionCard() {
    return (
        <div className="w-5/6 bg-white flex flex-col items-start shadow-md rounded p-4 z-10">
            <h1 className="text-4xl font-extrabold dark:text-white text-cyan-800 mb-4">Welcome to QuizQuest!</h1>

            <p className="text-gray-500 text-lg leading-relaxed">
                At QuizQuest, we believe in the power of curiosity and the thrill of discovery.
            </p>

            <div className="mb-2 mt-6 text-lg text-gray-500">
                <strong className="font-semibold">Endless Exploration - </strong>
                Dive into a realm of diverse quizzes that span General Knowledge, Science, History, Literature, and beyond.
            </div>
            <div className="mb-2 text-lg text-gray-500">
                <strong className="font-semibold">Competition - </strong>
                Challenge your friends, family, or fellow QuizQuest explorers.
            </div>
            <div className="mb-2 text-lg text-gray-500">
                <strong className="font-semibold">AI-Generated - </strong>
                Say goodbye to manual question formulation. With just a simple text input, unlock the power of our AI-generated quizzes.
            </div>

        </div>
    )
}