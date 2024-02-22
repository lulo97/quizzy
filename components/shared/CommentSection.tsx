import { KeyboardEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { 
    createCommentApiCall, 
    deleteCommentApiCall,
    editCommentApiCall
} from '../quiz-details/Utils';
import { Author, Comment } from '@/interfaces/QuizInterface';
import Image from 'next/image';
import { Input } from '../ui/input';

export default function CommentSection(props: {
    id: string,
    author_id: string,
    comments: Comment[],
    author_comments: Author[]
  }) {
    const router = useRouter();
  
    const [commentText, setCommentText] = useState('');
  
    async function handleCreateComment() {
      createCommentApiCall(props.id, props.author_id, commentText, router)
    };

    async function handleDeleteComment(comment_id: string) {
        deleteCommentApiCall(comment_id, router)
    }

    async function handleEditComment(comment: Comment) {
        console.log("handleEditComment:", comment)
        editCommentApiCall(comment,  router)
    }
  
    return (
      <div className='w-full h-full pb-6'>
        {/* Section to submit a new comment */}
        <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full h-24 p-2 border border-gray-300 rounded mb-2"
                placeholder="Write your comment here..."
              />
              <button
                onClick={handleCreateComment}
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 cursor-pointer"
              >
                Submit Comment
              </button>
        </div>
  
        {/* Section to display comments */}
        <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        
        {props.comments.map((comment, i) => (
                <CommentCard 
                    key={i}
                    comment={comment} 
                    author_comment={props.author_comments[i]} 
                    current_user_id={props.author_id}
                    handleDeleteComment={handleDeleteComment}
                    handleEditComment={handleEditComment}
                />
            ))
        }
        </div>
        </div>
    )
  }

function CommentCard(props: {
    author_comment: Author,
    comment: Comment,
    current_user_id: string,
    handleDeleteComment: (comment_id: string) => void
    handleEditComment: (comment: Comment) => void
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCommentMode, setEditCommentMode]  = useState(false);
    const [newCommentText, setNewCommentText] = useState(props.comment.text)

    function handleOpenEditMode() {
        setIsModalOpen(false);
        setEditCommentMode(!editCommentMode)
    }

    const handleEdit = (comment: Comment) => {
      // Implement the edit action
      console.log("handleEdit:", comment)
      props.handleEditComment(comment)
      handleOpenEditMode();
    };
  
    async function handleDelete(comment_id: string) {
      // Implement the delete action
      props.handleDeleteComment(comment_id)
      console.log('Delete comment:', comment_id);
      setIsModalOpen(false);
    };

    async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            setEditCommentMode(!editCommentMode);
            handleEdit(props.comment)
        }
    }

    function handleChangeNewCommentText(event: React.ChangeEvent<HTMLInputElement>) {
        const newText = event.target.value;
        props.comment.text = newText; // Avoid modifying props directly, consider creating a copy
        setNewCommentText(newText);
    }

    return (
        <div className='mb-3'>
            <div className='flex flex-row items-center justify-left gap-3'>
                <Image
                    src={props.author_comment.image}
                    alt={props.author_comment.name}
                    width={60}
                    height={60}
                    className='rounded-full'
                >
                </Image>
                <div className='text-left bg-gray-100 rounded-2xl p-2'>
                    <div className='font-bold'>
                        {props.author_comment.name}
                    </div>
                    {editCommentMode ? 
                    <div className='flex flex-row gap-3 items-center justify-center py-1'>
                        <Input
                            value={newCommentText}
                            onKeyDown={handleKeyDown}
                            onChange={handleChangeNewCommentText}
                        >
                        </Input>
                        <i 
                        className="fa fa-paper-plane text-sky-600 hover:bg-gray-200 rounded-full p-2 transition duration-300 ease-in-out" 
                        aria-hidden="true"
                        onClick={() => handleEdit(props.comment)}
                        >
                        </i>
                    </div>
                    :
                    <div>
                        {props.comment.text}
                    </div>
                    }
                </div>
                {props.comment.author_id == props.current_user_id ? 
                <div className='flex flex-col justify-center items-center pr-5'>
                    <i 
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="fa-solid fa-ellipsis hover:bg-gray-200 rounded-full p-2 transition duration-300 ease-in-out">
                    </i>
                </div> : ""}

                <EditModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        handleOpenEditMode={() => handleOpenEditMode()}
                        handleDelete={() => handleDelete(props.comment._id)}
                />
            </div>
            <div className='ml-16 text-xs text-gray-600'>
                {props.comment.createdAt.toDateString()}
            </div>
        </div>
    )
}

function EditModal(props: {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpenEditMode: () => void,
    handleDelete: () => void
  }) {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const modal = document.querySelector('.modal');
  
        if (modal && !modal.contains(event.target as Node)) {
          props.setIsModalOpen(false);
        }
      };
  
      if (props.isModalOpen) {
        document.addEventListener('click', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [props.isModalOpen, props.setIsModalOpen]);
  
    return (
      <>
        {props.isModalOpen && (
          <div className='relative'>
            <div className='p-4 rounded-md bg-white border border-gray-300 shadow-lg'>
              <div className='flex flex-row items-center justify-center text-center'>
                <button onClick={props.handleOpenEditMode} className='mr-2 text-blue-500 hover:underline'>
                  Edit
                </button>
                <button onClick={props.handleDelete} className='text-red-500 hover:underline'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }