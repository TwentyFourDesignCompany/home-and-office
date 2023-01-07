import React from "react";
import clientPic from "../assets/clientPic.png"
import ClientsCard from "./ClientsCard";

export default function ClientsSection() {
    return (
        <>
            <div className="clients__section">
                <div className="clients__section__heading">
                    What Our Clients Say About Us
                </div>
                <div className="clients__section__content">
                  <ClientsCard />
                  <ClientsCard />
                  <ClientsCard />
                </div>
            </div>

        </>
    );
}
