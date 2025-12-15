import { SignUp } from "./_components/sign-up-form";

export default function Page() {
  return (
    <>
      <SignUp />
    </>
  );
}

// "use client";

// import { useState } from "react";
// import { signup } from "@/services/api/index";
// import { signupPayload } from "@/types/auth";
// import { useRouter } from "next/navigation";
// import { Role } from "@/types/shared";

// export default function SignupPage() {
//   const router = useRouter();
//   const [form, setForm] = useState<signupPayload>({
//     name: "",
//     email: "",
//     password: "",
//     role: "USER" as Role,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signup(form);
//       router.push("/sign-in");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
//       <h1 className="text-xl font-semibold">Sign Up</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-2 rounded"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="border p-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="border p-2 rounded"
//         />

//         <button type="submit" className="bg-black text-white p-2 rounded">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }
