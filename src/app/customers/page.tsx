import { CardInfo } from "@/components/card";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewCustomerForm } from "@/components/forms/customer";

export default function Customers() {
  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Clientes
        </h1>
        <Sheet>
          <Button variant={"outline"}>
            <SheetTrigger className="flex gap-1 ">
              <FiUserPlus />
              Novo Cliente
            </SheetTrigger>
          </Button>

          <SheetContent className="w-full md:w-1/2 ">
            <SheetHeader>
              <SheetTitle>Cadastro de Cliente</SheetTitle>
            </SheetHeader>
            <div className="mt-10">
            <NewCustomerForm/>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2">
        <CardInfo />
        <CardInfo />
        <CardInfo />
      </div>
    </Container>
  );
}
