import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiEdit, FiTrash } from "react-icons/fi";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";

export function CardInfo() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between px-1">
            <div>
           
            </div>
            <FiEdit/>
        </div>
      </CardHeader>
        <CardContent className="flex flex-col items-start md:items-start ">
          <div className="flex flex-col w-full ">
            <div className="font-montserrat font-bold w-full md:w-full ">
              Nome:{" "}
              <span className="font-sans font-normal"> Brendon Santos</span>
            </div>
            <div className="font-montserrat font-bold w-full">
              Email:{" "}
              <span className="font-sans font-normal">
                brendonmcs@hotmail.com
              </span>
            </div>
            <div className="font-montserrat font-bold w-full">
              Celular:{" "}
              <span className="font-sans font-normal">(31) 9 94768512</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <div className="flex justify-end w-full">
                <FiTrash/>
            </div>
        </CardFooter>
      
    </Card>
  );
}
