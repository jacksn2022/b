// {
//   open && (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md mx-3 rounded-2xl shadow-lg p-6 relative">
//         <button
//           className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
//           onClick={() => setOpen(false)}
//         >
//           ✖
//         </button>

//         <h2 className="text-xl font-semibold text-slate-800 mb-4">
//           Account Verification
//         </h2>

//         <p className="text-sm text-slate-600 mb-5">
//           Please upload your <b>School ID</b> and <b>Gift Card</b> for
//           verification. You’ll receive a confirmation email within{" "}
//           <b>48 hours</b> once your documents are reviewed.
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-3">
//             Documents submitted successfully. You’ll receive a verification
//             email within 48 hours.
//           </div>
//         )}

//         <form className="space-y-5">
//           {/* School ID Upload */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               School ID Card
//             </label>
//             <input
//               type="file"
//               accept="image/*,.pdf"
//               onChange={(e) => setSchoolId(e.target.files[0])}
//               className="block w-full border border-slate-200 rounded-lg text-sm p-2 file:mr-3 file:px-3 file:py-2 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//             />
//             {schoolId && (
//               <p className="text-xs text-green-600 mt-1">
//                 {schoolId.name} selected
//               </p>
//             )}
//           </div>

//           {/* Gift Card Upload */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Gift Card
//             </label>
//             <div
//               className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition"
//               onClick={() => document.getElementById("giftCardInput").click()}
//             >
//               <Icon
//                 icon="mdi:gift-outline"
//                 width="40"
//                 className="mx-auto mb-2 text-blue-600"
//               />
//               <p className="text-slate-600 text-sm">
//                 {giftCard ? giftCard.name : "Click to upload or drag and drop"}
//               </p>
//             </div>
//             <input
//               id="giftCardInput"
//               type="file"
//               accept="image/*,.pdf"
//               className="hidden"
//               onChange={(e) => setGiftCard(e.target.files[0])}
//             />
//           </div>

//           {/* Submit Button */}

//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Icon
//                   icon="eos-icons:loading"
//                   className="animate-spin"
//                   width="20"
//                 />
//                 Uploading...
//               </>
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
