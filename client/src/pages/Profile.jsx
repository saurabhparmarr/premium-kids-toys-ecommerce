import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import { updateProfile } from "../features/auth/authThunk";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 

  if (loading) return;

    try {
      await dispatch(
        updateProfile({
          name,
          email,
        })
      ).unwrap();

      toast.success("Profile updated successfully", { id: "profile-toast" });
      setIsEditing(false);
    } catch (error) {
      
      const errorMessage = typeof error === 'string' ? error : (error?.message || "Something went wrong");
      toast.error(errorMessage, { id: "profile-toast" });
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-[2rem] border border-orange-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur">
        <div className="mb-6 flex items-center gap-4 border-b border-orange-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-orange-100 text-2xl font-black uppercase text-[#f97316]">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-black text-zinc-950">Account Overview</h1>
            <p className="text-sm text-zinc-500">Manage your profile information.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">Full Name</label>
            <input type="text" disabled={!isEditing} value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 transition disabled:bg-zinc-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">Email</label>
            <input type="email" disabled={!isEditing} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-3 text-zinc-900 transition disabled:bg-zinc-100" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700">Account Role</label>
            <input type="text" disabled value={user.role} className="w-full rounded-2xl border border-orange-100 bg-zinc-100 p-3 capitalize text-zinc-700" />
          </div>

          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)} className="w-full py-3">Edit Profile</Button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={loading} className="flex-1 py-3">{loading ? "Saving..." : "Save Changes"}</Button>
             <Button 
  type="button"
  onClick={() => { setName(user.name); setEmail(user.email); setIsEditing(false); }} 
  className="flex-1 bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
>
  Cancel
</Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;