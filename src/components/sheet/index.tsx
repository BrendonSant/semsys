"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NewCustomerForm } from "@/components/forms/customer";

export function SheetCustomer({ userId }: { userId: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => setIsSheetOpen((prev: boolean) => !prev);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
        <Button variant={"outline"} onClick={toggleSheet}>
          <FiUserPlus />
          Novo Cliente
        </Button>

        <SheetContent className="w-full md:w-1/2 ">
          <SheetHeader>
            <SheetTitle className="font-montserrat font-bold text-3xl text-mdblue-500">
              Cadastro de Cliente
            </SheetTitle>
          </SheetHeader>
          <div className="mt-10">
            <NewCustomerForm
              userId={userId}
              onClose={() => setIsSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
