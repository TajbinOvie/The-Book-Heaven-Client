
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner";

const LatestBooks = ({latestBooks}) => {;

    return (
        <div className="min-h-screen  py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
                    📚 Latest Books
                </h2>

                {latestBooks.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <p>No latest books available 😔</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {latestBooks.map((book) => (
                            <motion.div
                                key={book._id || book.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BookCard book={book} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestBooks;
