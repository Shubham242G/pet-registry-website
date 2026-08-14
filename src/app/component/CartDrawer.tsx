// // components/shop/CartDrawer.jsx
// 'use client';

// import { useCart } from '@/hooks/useCart';
// import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';

// export function CartDrawer() {
//   const { items, total, updateQuantity, removeItem, isOpen, closeCart } = useCart();

//   return (
//     <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}>
//       {/* Backdrop */}
//       <div 
//         className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
//           isOpen ? 'opacity-100' : 'opacity-0'
//         }`}
//         onClick={closeCart}
//       />

//       {/* Drawer */}
//       <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}>
//         <div className="flex h-full flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b p-4">
//             <h2 className="text-lg font-semibold flex items-center">
//               <ShoppingBag className="h-5 w-5 mr-2" />
//               Cart ({items.length})
//             </h2>
//             <button 
//               onClick={closeCart}
//               className="p-2 hover:bg-gray-100 rounded-full transition"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Cart Items */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {items.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500">
//                 <ShoppingBag className="h-12 w-12 mb-4" />
//                 <p>Your cart is empty</p>
//                 <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={closeCart}>
//                   Continue Shopping
//                 </Button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item._id} className="flex gap-4 rounded-lg border p-3">
//                     <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
//                       <Image
//                         src={item.product?.images?.[0] || '/placeholder-product.jpg'}
//                         alt={item.product?.name || 'Product'}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <h4 className="font-medium">{item.product?.name}</h4>
//                       <p className="text-sm text-gray-500">₹{item.product?.price?.toFixed(2)}</p>
//                       <div className="flex items-center gap-2">
//                         <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
//                           <Minus className="h-3 w-3" />
//                         </Button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                         <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => removeItem(item._id)}>
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                     <div className="text-right font-semibold">
//                       ₹{(item.product?.price * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {items.length > 0 && (
//             <div className="border-t p-4 space-y-4">
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span className="text-orange-600">₹{total.toFixed(2)}</span>
//               </div>
//               <Link href="/checkout" className="block">
//                 <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="lg">
//                   Proceed to Checkout
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }