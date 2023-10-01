"use client";
import Input from "./Input";
import Card from "./Card";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register, signin } from "../lib/api";
import { useState, useCallback } from "react";

// Sidebar has 2 modes, Sign in and Register
// Toggle between objects when the user toggles between  the different forms

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

//Initial state created outside the component, so it can eaily be reset if needed
const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }) {
  const [formState, setFormState] = useState(initial);
  const router = useRouter();

  //Could use Try and Catch to use error handling here instead of if else statement
  const handleSubmit = async (e) => {
    // Unless the event is specifically handled nothing will happen
    e.preventDefault();
    if (mode === "register") {
      await register(formState);
    } else {
      await signin(formState);
    }
    setFormState(initial);
    console.log(formState);
    //Push adds a new route to the stack so if the user hits back they can
    //Replace, replaces the existing stack so the user can't hit back
    router.replace("/home");
  };

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card className="">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    // Make sure to pass a call back to get access to the previous state, otherwise if we're just using from state it could lag behind state that is being set
                    // This way it always uses the previous state and not taking the formState in its current state above

                    //Look at Immer package, can be used to manage state here
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  prefetch
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button intent="secondary">{content.buttonText}</Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
