"use client";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NewCustomerForm } from "@/components/forms/customer";
import { SupplierForm } from "@/components/forms/suplliers";
import { ProductForm } from "../forms/product";
import { ServiForm } from "../forms/service";


export function SheetCustomer({
  id,
  buttonname,
  title,
  type,
  icon,
  userId
}: {
  id: string | null;
  buttonname: string | null;
  title: string;
  type: string;
  icon: ReactNode;
  userId: string | null
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => setIsSheetOpen((prev: boolean) => !prev);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
        {buttonname && (
          <Button variant={"outline"} onClick={toggleSheet}>
            {icon}
            {buttonname}
          </Button>
        )}

        {!buttonname && <button onClick={toggleSheet}>{icon}</button>}

        <SheetContent className="w-full md:w-1/2 ">
          <SheetHeader>
            <SheetTitle className="font-montserrat font-bold text-3xl text-mdblue-500">
              {title}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-10">
            {type === "customer" ? (
              <NewCustomerForm
                id={id}
                userId={userId}
                onClose={() => setIsSheetOpen(false)}
              />
            ) : type === "supplier" ? (
              <SupplierForm userId={userId} onClose={() => setIsSheetOpen(false)} />
            ) : type === "product" ? (
              <ProductForm userId={userId} id={id} onClose={() => setIsSheetOpen(false)} />
            ) : type === "servicing" ? (
              <ServiForm />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
