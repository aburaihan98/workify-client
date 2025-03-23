import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";

const tasks = [
  {
    id: 1,
    title: "Onboarding feedback",
    progress: "w-3/5",
    color: "bg-yellow-400",
  },
  {
    id: 2,
    title: "Set new employee account",
    progress: "w-2/5",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Post a Shoutout to welcome your new joiner",
    progress: "w-2/5",
    color: "bg-pink-400",
  },
];

const HRSoftwareSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <section className="dark:bg-[#222a3d] dark:text-[#a4aab0]">
        <section className="py-10 md:py-16 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Content */}
          <div className="">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold tracking-wide mb-8">
              Say hi to the HR software that
            </h2>
            <h1 className="text-3xl font-bold mt-2">
              Streamlines and automates HR processes
            </h1>
            <ul className="mt-4 space-y-3">
              <li>
                ✅ Save HR admin time by automating tasks and workflows for all
                core HR processes.
              </li>
              <li>
                ✅ Easily add and adjust workflows, tasks, and timelines as
                processes change.
              </li>
              <li>
                ✅ Customize workflows and make them personal for teams,
                departments, or individuals.
              </li>
            </ul>
            {/* Custom Button */}
            <button
              onClick={handleOpen}
              className="mt-6 bg-button hover:bg-hoverColor text-white py-3 px-6 rounded-lg text-lg "
            >
              🎥 Watch a Demo
            </button>
          </div>

          {/* Right Content (Task Card) */}
          <div className="bg-white dark:bg-[#1a202e] p-6 rounded-2xl shadow-lg">
            {/* Assigned User */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-md flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Jennifer Walker"
                className="w-14 h-14 rounded-full border-2 border-gray-300"
              />
              <p className="mt-2 text-sm text-gray-600">Assigned to</p>
              <p className="font-semibold text-gray-900">Jennifer Walker</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-10">Tasks</h3>
            <div className="mt-4 space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800">{task.title}</p>
                  <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
                    <div
                      className={`h-full ${task.progress} ${task.color} rounded-full`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* // modal */}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>🎥 Watch the Demo</DialogHeader>
          <DialogBody>
            <div className="relative w-full h-64 md:h-80">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </section>
    </>
  );
};

export default HRSoftwareSection;
