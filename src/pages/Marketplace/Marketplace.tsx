import { useMemo, useState, useEffect } from "react";
import type { Product } from "../../types/product";
import MarketplaceHeader from "../../components/marketplace/MarketplaceHeader";
import MarketplaceToolbar from "../../components/marketplace/MarketplaceToolbar";
import ProductGrid from "../../components/marketplace/ProductGrid";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/formatCurrency";

const Marketplace = () => {
    const {
        marketSearch,
        setMarketSearch,
        marketCategory,
        setMarketCategory,
        marketCondition,
        setMarketCondition,
        marketSort,
        setMarketSort,
        addItemToCollection,
    } = useApp();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err instanceof Error ? err.message : "An error occurred");
                setLoading(false);
            });
    }, []);

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(marketSearch.toLowerCase());

            const matchesCategory =
                marketCategory === "All" ||
                product.category === marketCategory;

            const matchesCondition =
                marketCondition === "All" ||
                product.condition === marketCondition;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesCondition
            );
        });

        switch (marketSort) {
            case "price-low-high":
                return [...filtered].sort((a, b) => a.price - b.price);

            case "price-high-low":
                return [...filtered].sort((a, b) => b.price - a.price);

            default:
                return filtered;
        }
    }, [
        products,
        marketSearch,
        marketCategory,
        marketCondition,
        marketSort,
    ]);

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
            <MarketplaceHeader />

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white" />
                </div>
            ) : error ? (
                <div className="rounded-xl border border-red-205 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">Failed to load marketplace products</h3>
                    <p className="mt-2 text-sm text-red-650 dark:text-red-350">{error}</p>
                </div>
            ) : (
                <>
                    <MarketplaceToolbar
                        searchTerm={marketSearch}
                        selectedCategory={marketCategory}
                        selectedCondition={marketCondition}
                        sortOption={marketSort}
                        onSearchChange={setMarketSearch}
                        onCategoryChange={setMarketCategory}
                        onConditionChange={setMarketCondition}
                        onSortChange={setMarketSort}
                    />

                    <ProductGrid 
                        products={filteredProducts} 
                        onAddToOwned={(product) => addItemToCollection(product, "Owned")}
                        onAddToWishlist={(product) => addItemToCollection(product, "Wishlist")}
                        onViewDetails={(product) => setSelectedProduct(product)}
                    />
                </>
            )}

            {/* Product Details Modal */}
            {selectedProduct && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row max-h-[90vh] dark:border-slate-800 dark:bg-slate-900">
                        {/* Left/Top: Image */}
                        <div className="w-full md:w-1/2 bg-slate-50 relative aspect-[4/3] md:aspect-auto dark:bg-slate-800">
                            <img 
                                src={selectedProduct.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80"} 
                                alt={selectedProduct.title}
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80";
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right/Bottom: Information */}
                        <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
                            <div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        {selectedProduct.category}
                                    </span>
                                    <button 
                                        onClick={() => setSelectedProduct(null)}
                                        className="text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-300 text-2xl font-semibold leading-none cursor-pointer"
                                        aria-label="Close modal"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <h2 id="modal-title" className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl leading-snug dark:text-white">
                                    {selectedProduct.title}
                                </h2>

                                <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                                    {formatCurrency(selectedProduct.price)}
                                </p>

                                <div className="mt-6 space-y-4 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-medium dark:text-slate-400">Condition</span>
                                        <span className="text-slate-900 font-semibold dark:text-slate-200">{selectedProduct.condition}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-medium dark:text-slate-400">Seller</span>
                                        <span className="text-slate-900 font-medium dark:text-slate-300">{selectedProduct.sellerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 font-medium dark:text-slate-400">Location</span>
                                        <span className="text-slate-900 font-medium dark:text-slate-300">{selectedProduct.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => {
                                        addItemToCollection(selectedProduct, "Owned");
                                        setSelectedProduct(null);
                                    }}
                                    className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none hover:bg-slate-800 focus:ring-2 focus:ring-slate-900/20 cursor-pointer text-center dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    Add to Collection
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        addItemToCollection(selectedProduct, "Wishlist");
                                        setSelectedProduct(null);
                                    }}
                                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none hover:bg-slate-50 focus:ring-2 focus:ring-slate-950/20 cursor-pointer text-center dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Marketplace;