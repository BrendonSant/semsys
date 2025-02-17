import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import prismaClient from '@/lib/prisma'

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' },{
            status: 401
        })
    }

    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('id');

    if(!userId) {
        return NextResponse.json({ error: 'Service id not found' },{
            status: 400
        })
    }

   

   try {
    await prismaClient.ticket.delete({
        where: {
            id: userId as string
        }
    })

    return NextResponse.json({ message: 'Serviço deletado!'});
    
   } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed delete service' },{
        status: 400
    })
   }
}

//##################################################################################


export async function POST(request: Request) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' },{
            status: 401
        })
    }

    const { name,description,payment,status,serviceprice,total,customerId,supplierId,productId,userId } = await request.json();

    try {

        await prismaClient.ticket.create({
            data: {
                name,
                description,
                payment,
                status,
                serviceprice,
                total,
                customerId: customerId,
                supplierId: supplierId,
                productId: productId,
                userId: userId
            }
        })

        return NextResponse.json({ message: 'Serviço lançado!' })
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed create new service' },{
            status: 400
        })
    }
    

}

//##################################################################################



export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
  
    const { id,name,description,payment,status,serviceprice,total,customerId,supplierId,productId,userId } = await request.json();
  
    if (!id) {
      return NextResponse.json(
        { error: "Servicing id not found" },
        {
          status: 400,
        }
      );
    }
  
    try {
      await prismaClient.ticket.update({
        where: {
          id: id as string,
        },
        data: {
            name,
            description,
            payment,
            status,
            serviceprice,
            total,
            customerId: customerId,
            supplierId: supplierId,
            productId: productId,
            userId: userId
        },
      });
  
      return NextResponse.json({ message: "Serviço  atualizado!" });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to update servicing" },
        {
          status: 400,
        }
      );
    }
  }