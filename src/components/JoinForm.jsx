import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function JoinForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const submit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1300);
  };
  return (
    <form className="glass-form notch-lg" onSubmit={submit}>
      <div className="field">
        <input type="text" placeholder=" " required />
        <label>Full name</label>
      </div>
      <div className="field">
        <input type="email" placeholder=" " required />
        <label>Email address</label>
      </div>
      <div className="field">
        <textarea rows={4} placeholder=" " required />
        <label>What brings you to TECHhelp4u?</label>
      </div>
      <button className="btn btn-primary btn-full" type="submit" disabled={status !== "idle"}>
        {status === "idle" && <>Send message <ArrowRight size={16} /></>}
        {status === "sending" && "Sending…"}
        {status === "done" && <span className="success-check"><Check size={16} /> Sent — we'll be in touch</span>}
      </button>
    </form>
  );
}
