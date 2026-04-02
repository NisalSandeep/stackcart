import React from "react";
import { useAuth, SignInButton } from "@clerk/react";
import { useState } from "react";
import { useCreateComments, useDeleteComments } from "../hooks/useComments";
import {
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LogInIcon,
} from "lucide-react";

export const CommentsSection = ({
  productId,
  comments = [],
  currentUserId,
}) => {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComments();
  const deleteComment = useDeleteComments(productId);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment.mutate(
      { productId, content },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <MessageSquareIcon className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Comments</h3>
          <p className="text-sm text-base-content/60">{comments.length} comment{comments.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {isSignedIn ? (
        <form onSubmit={hanldeSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/20 transition-all placeholder-base-content/40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <SendIcon className="size-5" />
            )}
          </button>
        </form>
      ) : (
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-base-content/60">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg text-sm flex items-center gap-2">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No comments yet. Be the first to share!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full ring-2 ring-primary/50 overflow-hidden flex-shrink-0">
                  <img src={comment.user?.imageUrl} alt={comment.user?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{comment.user?.name}</p>
                    {currentUserId === comment.userId && (
                      <button
                        onClick={() =>
                          confirm("Delete this comment?") &&
                          deleteComment.mutate({ commentId: comment.id })
                        }
                        className="p-1 rounded hover:bg-error/20 transition-all disabled:opacity-50"
                        disabled={deleteComment.isPending}
                      >
                        {deleteComment.isPending ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <Trash2Icon className="size-4 text-error" />
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-base-content/50 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-base-content/80 mt-2 break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
