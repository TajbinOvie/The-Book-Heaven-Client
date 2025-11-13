import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../Provider/AuthContext";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  // Fetch book details
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => setBook(res.data.result))
      .catch(err => console.error("Error fetching book:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch comments
  useEffect(() => {
    axios.get(`http://localhost:3000/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error("Error fetching comments:", err));
  }, [id]);

  // Post comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to comment.");
    if (!newComment.trim()) return;

    const commentData = {
      bookId: id,
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      comment: newComment,
    };

    try {
      setCommentLoading(true);
      const res = await axios.post("http://localhost:3000/comments", commentData);
      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setCommentLoading(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/comments/${commentId}`, { data: { userId: user.uid } });
        setComments(comments.filter(c => c._id !== commentId));
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting comment:", err);
        Swal.fire("Error", "Failed to delete comment.", "error");
      }
    }
  };

  if (loading || !book) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen dark:bg-gray-900 dark:text-gray-200">
      <title>Book Details</title>
      {/* Book Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-1/3 h-full object-cover rounded-xl shadow-lg dark:shadow-gray-800"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{book.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-1">
            By <span className="font-medium">{book.author}</span>
          </p>
          {book.genre && <p className="text-gray-500 dark:text-gray-400 mb-1">Genre: {book.genre}</p>}
          {book.rating && (
            <p className="text-yellow-500 font-semibold mb-3">
              Rating: {book.rating} / 5 ⭐
            </p>
          )}
          <p className="text-gray-700 dark:text-gray-300 mt-4">{book.summary}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {user && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-200"
              rows="3"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={commentLoading}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}

        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c._id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {c.userPhoto && (
                      <img
                        src={c.userPhoto}
                        alt={c.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{c.userName}</p>
                      <p className="text-gray-400 dark:text-gray-400 text-sm">
                        {format(new Date(c.createdAt), "PPP p")}
                      </p>
                    </div>
                  </div>

                  {user && user.uid === c.userId && (
                    <>
                      <Trash2
                        id={`delete-tooltip-${c._id}`}
                        onClick={() => handleDeleteComment(c._id)}
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                      />
                      <Tooltip
                        anchorId={`delete-tooltip-${c._id}`}
                        content="Delete Comment"
                        className="bg-blue-700 text-white text-sm z-[9999]"
                        place="top"
                      />
                    </>
                  )}
                </div>
                <p className="text-gray-800 dark:text-gray-200">{c.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
