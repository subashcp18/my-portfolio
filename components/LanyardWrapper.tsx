"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(
    () => import("./Lanyard"),
    {
        ssr: false,
        loading: () => <div className="h-full w-full" />,
    }
);

export default function LanyardWrapper() {
    return (
        <div className="h-full w-full">
            <Lanyard
                size={0.42}
                anchor="right"
                frontImage="/images/id_profile.png"
                employeeName="Subash"
                employeeRole="App Developer"
                companyName="TIC Global"
                employeeId="TIC015"
                department="Engineering"
                portfolioUrl="https://your-actual-portfolio-url.com"
                email="subashtechmaverick@gmail.com"
            />
        </div>
    );
}