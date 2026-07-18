/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CollectionItem, CollectionType } from "../types/collection";
import type { Product } from "../types/product";
import type { Post, Comment } from "../types/post";
import toast from "react-hot-toast";

interface AppContextType {
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  collection: CollectionItem[];
  collectionLoading: boolean;
  collectionError: string | null;
  posts: Post[];
  postsLoading: boolean;
  postsError: string | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  
  // Marketplace Filter State
  marketSearch: string;
  setMarketSearch: (s: string) => void;
  marketCategory: string;
  setMarketCategory: (s: string) => void;
  marketCondition: string;
  setMarketCondition: (s: string) => void;
  marketSort: string;
  setMarketSort: (s: string) => void;

  // Community Feed Filter State
  feedSearch: string;
  setFeedSearch: (s: string) => void;
  feedCategory: string;
  setFeedCategory: (s: string) => void;

  // My Collection Filter/Tab State
  collectionSearch: string;
  setCollectionSearch: (s: string) => void;
  collectionCategory: string;
  setCollectionCategory: (s: string) => void;
  collectionSort: string;
  setCollectionSort: (s: string) => void;
  collectionTab: CollectionType;
  setCollectionTab: (t: CollectionType) => void;

  // Actions
  addItemToCollection: (product: Product, type: CollectionType) => void;
  removeItemFromCollection: (id: string) => void;
  moveItemCollection: (id: string, newType: CollectionType) => void;
  likePost: (id: string) => void;
  toggleSavePost: (id: string) => void;
  addCommentToPost: (postId: string, content: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("collector_hub_theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Sync theme class with HTML element
  useEffect(() => {
    localStorage.setItem("collector_hub_theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Marketplace products state
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Collection state
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [collectionError, setCollectionError] = useState<string | null>(null);

  // Community posts state (to track likes/saves)
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Fetch marketplace products
  useEffect(() => {
    fetch("/data/marketplaceProducts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch marketplace products: ${res.statusText}`);
        }
        return res.json() as Promise<Product[]>;
      })
      .then((data) => {
        setProducts(data);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProductsError(err instanceof Error ? err.message : "An error occurred");
        setProductsLoading(false);
      });
  }, []);

  // Fetch collection items and merge with local storage
  useEffect(() => {
    fetch("/data/collectionItems.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch collection items: ${res.statusText}`);
        }
        return res.json() as Promise<CollectionItem[]>;
      })
      .then((defaultCollectionItems) => {
        const saved = localStorage.getItem("collector_hub_collection");
        if (!saved) {
          setCollection(defaultCollectionItems);
        } else {
          try {
            const parsed = JSON.parse(saved) as CollectionItem[];
            const merged = parsed.map((item) => {
              const defaultItem = defaultCollectionItems.find((d) => d.id === item.id);
              return defaultItem ? { ...item, image: defaultItem.image } : item;
            });
            setCollection(merged);
          } catch {
            setCollection(defaultCollectionItems);
          }
        }
        setCollectionLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCollectionError(err instanceof Error ? err.message : "An error occurred");
        setCollectionLoading(false);
      });
  }, []);

  // Fetch community posts and merge with local storage
  useEffect(() => {
    fetch("/data/communityPosts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch community posts: ${res.statusText}`);
        }
        return res.json() as Promise<Post[]>;
      })
      .then((defaultCommunityPosts) => {
        const saved = localStorage.getItem("collector_hub_posts");
        if (!saved) {
          setPosts(defaultCommunityPosts);
        } else {
          try {
            const parsed = JSON.parse(saved) as Post[];
            const merged = parsed.map((post) => {
              const defaultPost = defaultCommunityPosts.find((d) => d.id === post.id);
              if (defaultPost) {
                return {
                  ...post,
                  image: defaultPost.image,
                  title: defaultPost.title,
                  userAvatar: defaultPost.userAvatar,
                  description: defaultPost.description,
                  category: defaultPost.category,
                  userName: defaultPost.userName,
                  postedAt: defaultPost.postedAt,
                  commentsList: post.commentsList || defaultPost.commentsList || [],
                };
              }
              return post;
            });
            setPosts(merged);
          } catch {
            setPosts(defaultCommunityPosts);
          }
        }
        setPostsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPostsError(err instanceof Error ? err.message : "An error occurred");
        setPostsLoading(false);
      });
  }, []);

  // Persist to local storage only after loading and without errors
  useEffect(() => {
    if (!collectionLoading && !collectionError) {
      localStorage.setItem("collector_hub_collection", JSON.stringify(collection));
    }
  }, [collection, collectionLoading, collectionError]);

  useEffect(() => {
    if (!postsLoading && !postsError) {
      localStorage.setItem("collector_hub_posts", JSON.stringify(posts));
    }
  }, [posts, postsLoading, postsError]);

  // Marketplace filter states
  const [marketSearch, setMarketSearch] = useState("");
  const [marketCategory, setMarketCategory] = useState("All");
  const [marketCondition, setMarketCondition] = useState("All");
  const [marketSort, setMarketSort] = useState("newest");

  // Community feed filter states
  const [feedSearch, setFeedSearch] = useState("");
  const [feedCategory, setFeedCategory] = useState("All");

  // My Collection states
  const [collectionSearch, setCollectionSearch] = useState("");
  const [collectionCategory, setCollectionCategory] = useState("All");
  const [collectionSort, setCollectionSort] = useState("newest");
  const [collectionTab, setCollectionTab] = useState<CollectionType>("Owned");

  // Collection Actions
  const addItemToCollection = (product: Product, type: CollectionType) => {
    setCollection((prev) => {
      // Prevent duplicates in same collection type by product ID
      const exists = prev.some(
        (item) =>
          (item.id === product.id || item.id.startsWith(`${product.id}-`)) &&
          item.collectionType === type
      );

      if (exists) {
        toast.error(`"${product.title}" is already in your ${type} collection!`);
        return prev;
      }

      const newItem: CollectionItem = {
        id: `${product.id}-${Date.now()}`,
        title: product.title,
        image: product.image,
        category: product.category,
        condition: product.condition,
        estimatedValue: product.price,
        acquiredDate: new Date().toISOString().split("T")[0],
        location: product.location || "Vault Container",
        collectionType: type,
      };

      toast.success(`Added "${product.title}" to ${type} collection.`);
      return [newItem, ...prev];
    });
  };

  const removeItemFromCollection = (id: string) => {
    const item = collection.find((i) => i.id === id);
    setCollection((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      toast.success(`Removed "${item.title}" from your collection.`);
    }
  };

  const moveItemCollection = (id: string, newType: CollectionType) => {
    setCollection((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, collectionType: newType } : item
      )
    );
    const item = collection.find((i) => i.id === id);
    if (item) {
      toast.success(`Moved "${item.title}" to ${newType}.`);
    }
  };

  // Community Actions
  const likePost = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = post.isLiked;
          return {
            ...post,
            isLiked: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const toggleSavePost = (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    
    const wasSaved = post.isSaved;
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSaved: !wasSaved } : p))
    );

    if (!wasSaved) {
      toast.success("Post saved to bookmarks!");
    } else {
      toast.success("Post removed from bookmarks.");
    }
  };

  const addCommentToPost = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `${postId}-${Date.now()}`,
            userName: "You",
            content,
            commentedAt: "Just now",
          };
          const list = post.commentsList || [];
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...list, newComment],
          };
        }
        return post;
      })
    );
    toast.success("Comment posted!");
  };

  return (
    <AppContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        collection,
        collectionLoading,
        collectionError,
        posts,
        postsLoading,
        postsError,
        marketSearch,
        setMarketSearch,
        marketCategory,
        setMarketCategory,
        marketCondition,
        setMarketCondition,
        marketSort,
        setMarketSort,
        feedSearch,
        setFeedSearch,
        feedCategory,
        setFeedCategory,
        collectionSearch,
        setCollectionSearch,
        collectionCategory,
        setCollectionCategory,
        collectionSort,
        setCollectionSort,
        collectionTab,
        setCollectionTab,
        addItemToCollection,
        removeItemFromCollection,
        moveItemCollection,
        likePost,
        toggleSavePost,
        addCommentToPost,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
