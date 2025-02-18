'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Container } from "../container";

import { api } from "@/lib/api";

import { useQueries } from "@tanstack/react-query";








export function reports(){
    return(
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Brendon Santos
                    </CardTitle>
                    <CardDescription>
                        brendonmcs@hotmail.com
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardTitle>Número de serviços Realizados:</CardTitle>
                    <CardDescription>10</CardDescription>
                    <CardTitle>Número de serviços Parados:</CardTitle>
                    <CardDescription>10</CardDescription>
                    <CardTitle>Número de serviços Executando:</CardTitle>
                    <CardDescription>10</CardDescription>
                    <CardTitle>Número de serviços Não iniciado :</CardTitle>
                    <CardDescription>10</CardDescription>
                    <CardTitle>Total de serviços :</CardTitle>
                    <CardDescription>40</CardDescription>
                </CardContent>
                <CardFooter>
                    <CardDescription>Cliente desde:</CardDescription>
                    <CardDescription>18/02/2025</CardDescription>
                </CardFooter>
            </Card>
        </Container>
    )
}