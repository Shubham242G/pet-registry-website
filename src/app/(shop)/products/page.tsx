// // app/(shop)/products/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { ProductCard } from '../../component/ProductCard';
// import { Loader2, Filter } from 'lucide-react';
// import { toast } from 'sonner';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: '',
//     minPrice: '',
//     maxPrice: '',
//     sort: 'createdAt',
//     order: 'desc',
//     page: 1
//   });
//   const [pagination, setPagination] = useState({});

//   useEffect(() => {
//     fetchProducts();
//   }, [filters]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams(filters);
//       const res = await fetch(`/api/products?${params}`);
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.products);
//         setPagination(data.pagination);
//       }
//     } catch (error) {
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Pet Products</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
//               <h2 className="font-semibold text-lg mb-4 flex items-center">
//                 <Filter className="h-5 w-5 mr-2" /> Filters
//               </h2>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Category</label>
//                   <select 
//                     className="w-full border rounded-lg px-3 py-2"
//                     value={filters.category}
//                     onChange={(e) => setFilters({...filters, category: e.target.value, page: 1})}
//                   >
//                     <option value="">All</option>
//                     <option value="dry_food">Dry Food</option>
//                     <option value="wet_food">Wet Food</option>
//                     <option value="treats">Treats</option>
//                     <option value="supplements">Supplements</option>
//                     <option value="premium_food">Premium Food</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Price Range</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       className="w-1/2 border rounded-lg px-3 py-2"
//                       value={filters.minPrice}
//                       onChange={(e) => setFilters({...filters, minPrice: e.target.value, page: 1})}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       className="w-1/2 border rounded-lg px-3 py-2"
//                       value={filters.maxPrice}
//                       onChange={(e) => setFilters({...filters, maxPrice: e.target.value, page: 1})}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Sort By</label>
//                   <select 
//                     className="w-full border rounded-lg px-3 py-2"
//                     value={filters.sort}
//                     onChange={(e) => setFilters({...filters, sort: e.target.value})}
//                   >
//                     <option value="createdAt">Newest</option>
//                     <option value="price">Price: Low to High</option>
//                     <option value="-price">Price: High to Low</option>
//                     <option value="name">Name</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', sort: 'createdAt', order: 'desc', page: 1 })}
//                   className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="lg:col-span-3">
//             {loading ? (
//               <div className="flex justify-center py-12">
//                 <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//                 <p className="text-gray-500">No products found</p>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {products.map((product) => (
//                     <ProductCard key={product._id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {pagination.pages > 1 && (
//                   <div className="flex justify-center mt-8 gap-2">
//                     {[...Array(pagination.pages)].map((_, i) => (
//                       <button
//                         key={i}
//                         className={`px-4 py-2 rounded-lg transition ${
//                           i + 1 === pagination.page
//                             ? 'bg-orange-500 text-white'
//                             : 'bg-white hover:bg-gray-100 text-gray-700'
//                         }`}
//                         onClick={() => setFilters({ ...filters, page: i + 1 })}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }