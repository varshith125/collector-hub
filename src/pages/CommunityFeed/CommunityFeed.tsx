import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { Post } from "../../types/post";
import { useApp } from "../../context/AppContext";

const CommunityFeed = () => {
  const {
    posts,
    postsLoading,
    postsError,
    feedSearch,
    setFeedSearch,
    feedCategory,
    setFeedCategory,
    likePost,
    toggleSavePost,
    addCommentToPost,
  } = useApp();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
        setNewCommentText("");
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(feedSearch.toLowerCase()) ||
        post.description.toLowerCase().includes(feedSearch.toLowerCase()) ||
        post.userName.toLowerCase().includes(feedSearch.toLowerCase());

      const matchesCategory =
        feedCategory === "All" || post.category === feedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, feedSearch, feedCategory]);

  useEffect(() => {
    if (!feedSearch.trim()) {
      toast.dismiss("search-error-toast");
      return;
    }

    const timer = setTimeout(() => {
      if (filteredPosts.length === 0) {
        toast.error("Incorrect name: No item found matching your search", {
          id: "search-error-toast",
        });
      } else {
        toast.dismiss("search-error-toast");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [feedSearch, filteredPosts.length]);

  const fallbackImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80";

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header section */}
      <div className="border-b border-slate-200 pb-4 sm:pb-6 mb-6 sm:mb-8 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Community Feed
        </h1>
        <p className="mt-1 sm:mt-2 text-sm text-slate-600 sm:text-lg dark:text-slate-400">
          Discover what collectors are sharing.
        </p>
      </div>

      {postsLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white" />
        </div>
      ) : postsError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">Failed to load feed</h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{postsError}</p>
        </div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search posts by title, content, or user..."
                value={feedSearch}
                onChange={(e) => setFeedSearch(e.target.value)}
                className="w-full min-h-[44px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-950/5 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={feedCategory}
                onChange={(e) => setFeedCategory(e.target.value)}
                className="w-full sm:w-auto min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-950/5 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="All">All Categories</option>
                <option value="Video Games">Video Games</option>
                <option value="Trading Cards">Trading Cards</option>
                <option value="Comics">Comics</option>
                <option value="Lego">Lego</option>
                <option value="Hot Wheels">Hot Wheels</option>
                <option value="Coins">Coins</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No posts found</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            /* Grid of posts */
            <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="h-10 w-10 rounded-full object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 leading-tight dark:text-white">
                        {post.userName}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {post.postedAt}
                      </span>
                    </div>
                  </div>

                  {/* Post Image */}
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="aspect-video w-full overflow-hidden bg-slate-50 cursor-pointer focus:outline-none dark:bg-slate-800"
                    aria-label={`Open details for post: ${post.title}`}
                  >
                    <img
                      src={post.image || fallbackImage}
                      alt={post.title}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </button>

                  {/* Post Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {post.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="text-left focus:outline-none cursor-pointer group"
                    >
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300 transition-colors">
                        {post.title}
                      </h2>
                    </button>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 flex-1 dark:text-slate-400">
                      {post.description}
                    </p>

                    {/* Engagement Stats */}
                    <div className="mt-4 sm:mt-5 flex items-center justify-between border-t border-slate-100 pt-3 sm:pt-4 dark:border-slate-800">
                      <div className="flex items-center gap-3 sm:gap-6">
                        <button
                          type="button"
                          onClick={() => likePost(post.id)}
                          className={`flex items-center gap-1.5 min-h-[44px] px-2 text-sm transition-colors outline-none cursor-pointer ${
                            post.isLiked ? "text-red-500" : "text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                          }`}
                          aria-label={post.isLiked ? "Unlike post" : "Like post"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={post.isLiked ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                          <span className="font-semibold">{post.likes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-slate-500 transition-colors hover:text-blue-500 outline-none cursor-pointer dark:text-slate-400 dark:hover:text-blue-400"
                          aria-label="View comments"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785 1.503 1.503 0 0 0 1.22 2.458 12.31 12.31 0 0 0 2.844-.313c.536-.102 1.1-.013 1.536.27A8.995 8.995 0 0 0 12 20.25Z"
                            />
                          </svg>
                          <span className="font-semibold">{post.comments}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSavePost(post.id)}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 transition-colors outline-none cursor-pointer ${
                          post.isSaved ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                        }`}
                        aria-label={post.isSaved ? "Unsave post" : "Save post"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={post.isSaved ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5.5 w-5.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {/* Post Details Modal */}
      {selectedPost && (() => {
        const livePost = posts.find((p) => p.id === selectedPost.id) || selectedPost;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPost(null);
                setNewCommentText("");
              }
            }}
          >
            <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row max-h-[92vh] my-auto dark:border-slate-800 dark:bg-slate-900 cursor-default" onClick={(e) => e.stopPropagation()}>
              {/* Left/Top Image */}
              <div className="w-full md:w-1/2 bg-slate-50 relative aspect-[16/9] sm:aspect-[4/3] md:aspect-auto dark:bg-slate-800 shrink-0">
                <img
                  src={livePost.image || fallbackImage}
                  alt={livePost.title}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right/Bottom Info & Comments */}
              <div className="p-4 sm:p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={livePost.userAvatar}
                        alt={livePost.userName}
                        className="h-8 w-8 rounded-full object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                          {livePost.userName}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {livePost.postedAt}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPost(null);
                        setNewCommentText("");
                      }}
                      className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl font-semibold leading-none cursor-pointer"
                      aria-label="Close modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {livePost.category}
                    </span>
                    <h2
                      id="post-modal-title"
                      className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug dark:text-white"
                    >
                      {livePost.title}
                    </h2>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                      {livePost.description}
                    </p>
                  </div>

                  {/* Dynamic Comments Section */}
                  <div className="mt-4 sm:mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 flex-1">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 dark:text-slate-400">
                      Comments ({livePost.comments})
                    </h4>
                    <div className="space-y-3 max-h-36 sm:max-h-40 overflow-y-auto pr-1">
                      {(livePost.commentsList || []).map((cmt) => (
                        <div key={cmt.id} className="text-xs">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{cmt.userName}</p>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{cmt.commentedAt}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 dark:text-slate-400">{cmt.content}</p>
                        </div>
                      ))}
                      {(livePost.commentsList || []).length === 0 && (
                        <p className="text-xs text-slate-400 italic dark:text-slate-500">No comments yet. Be the first to comment!</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Area */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* Write Comment Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newCommentText.trim()) return;
                      addCommentToPost(livePost.id, newCommentText.trim());
                      setNewCommentText("");
                    }}
                    className="flex gap-2 mb-3"
                  >
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                    />
                    <button
                      type="submit"
                      className="min-h-[44px] px-4 rounded-lg bg-slate-950 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                      Post
                    </button>
                  </form>

                  {/* Engagement Panel */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => likePost(livePost.id)}
                        className={`flex items-center gap-1.5 min-h-[44px] text-sm transition-colors outline-none cursor-pointer ${
                          livePost.isLiked ? "text-red-500" : "text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={livePost.isLiked ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                        <span className="font-semibold">
                          {livePost.likes}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSavePost(livePost.id)}
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors outline-none cursor-pointer ${
                        livePost.isSaved ? "text-indigo-600" : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={livePost.isSaved ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
};

export default CommunityFeed;
