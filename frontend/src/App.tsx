import Home from "./content/home/Home";
import Quiz from "./content/quiz/Quiz";
import Header from "./Header";
import FormQuestionPage from "./content/form/FormQuestionPage";
import QuestionsOverviewPage from "./content/questionsOverview/QuestionsOverviewPage";
import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFormContext } from "./context/form-context";
import NotFound from "./NotFound";

/* import Footer from "./Footer"; */





export default function App(){

    const {isAdmin} = useFormContext();

    return (

        
        <div className="min-h-screen flex flex-col w-full">
            <Header/>
                <main className="flex-grow pt-3 sm:pt-6 lg:pt-8 w-full  bg-gray-50 dark:bg-dark-very-dark-grey">
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<NotFound />} />
                            <Route path="/" element={<Home/>}></Route>
                            <Route path="/:lf/Quiz" element={<Quiz/>}></Route>
                            <Route
                                path=":lf/Frage-hinzufügen"
                                element={
                                    <ProtectedRoute condition={isAdmin}>
                                        <FormQuestionPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route 
                                path=":lf/Fragen-bearbeiten" 
                                element={
                                    <ProtectedRoute condition={isAdmin}>
                                        <QuestionsOverviewPage/>
                                    </ProtectedRoute>
                                } 
                            />
                        </Routes>
                    </BrowserRouter>
                </main>
            {/* <Footer/> */}
        </div>
        
        
   



    )

}

