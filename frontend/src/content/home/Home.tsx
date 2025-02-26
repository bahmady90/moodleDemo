import Modal from "../../Modal";
import AdminLogin from "./AdminLogin";
import Lernfeld from "./Lernfeld";

import { useFormContext } from "../../context/form-context";
/* import LoginRegister from "./LoginRegister"; */

const lernfelder = [
    { name: "LF-01:", src: "LF1.png", title: "Das Unternehmen und die eigene Rolle im Betrieb beschreiben", lf: 1, disabled: false},
    { name: "LF-02:", src: "LF2.png", title: "Arbeitsplätze nach Kundenwunsch ausstatten", lf: 2, disabled: false   },
    { name: "LF-03:", src: "LF3.jpg", title: "Clients in Netzwerke einbinden", lf: 3, disabled: true   },
    { name: "LF-04:", src: "LF4.jpg", title: "Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen", lf: 4, disabled: true   },
    { name: "LF-05:", src: "LF5.jpg", title: "Software zur Verwaltung von Daten anpassen", lf: 5, disabled: true   },
    { name: "LF-06:", src: "LF6.jpg", title: "Serviceanfragen bearbeiten", lf: 6, disabled: true   },
    { name: "LF-07:", src: "LF7.jpg", title: "Cyber-physische Systeme ergänzen", lf: 7, disabled: true   },
    { name: "LF-08:", src: "LF8.jpg", title: "Daten systemübergreifend bereitstellen", lf: 8, disabled: true   },
    { name: "LF-09:", src: "LF9.jpg", title: "Netzwerke und Dienste bereitstellen", lf: 9, disabled: true   }
];




export default function Home(){

    const {openModalAdminLogin} = useFormContext();


    return (

        <>
            <Modal openModal={openModalAdminLogin}>
                <AdminLogin/>
            </Modal>
            {/* <LoginRegister/> */}
            <main className="grid max-h-full">
                
                <ul className="grid grid-cols-2 sm:grid-cols-3  mt-2 mb-10
                        grid-rows-[repeat(2,_8.5rem)] sm:grid-rows-[repeat(3,_11rem)] 
                        md:grid-rows-[repeat(3,_14rem)] lg:grid-rows-[repeat(3,_18rem)] 
                        xl:grid-rows-[repeat(3,_24rem)]
                        w-[90%] max-w-[1800px]
                        justify-self-center gap-x-3 gap-y-3 sm:gap-2 md:gap-3">
                {lernfelder.map((lernFeld, index) => 
                    <Lernfeld 
                        name={lernFeld.name} 
                        title={lernFeld.title}
                        src={lernFeld.src}
                        key={index}
                        lf={lernFeld.lf}
                        disabled={lernFeld.disabled}
                        />
                )}
                </ul>
            </main>
        </>
        
    )
}


