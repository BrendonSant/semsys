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
        return NextResponse.json({ error: 'User id not found' },{
            status: 400
        })
    }

    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            productId: userId
        }
    })

    if(findTicket) {
        return NextResponse.json({ error: 'Cliente possui tickets ativos' },{
            status: 400
        })
    }

   try {
    await prismaClient.product.delete({
        where: {
            id: userId as string
        }
    })

    return NextResponse.json({ message: 'Cliente deletado!'});
    
   } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed delete supplier' },{
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

    const { name,price,description,userId } = await request.json();

    try {

        await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                userId: userId
            }
        })

        return NextResponse.json({ message: 'Produto cadastrado!' })
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed create new product' },{
            status: 400
        })
    }
    

}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, {
            status: 401
        });
    }

    const { id, name, price, description, userId } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'Product id not found' }, {
            status: 400
        });
    }

    try {
        await prismaClient.product.update({
            where: {
                id: id as string
            },
            data: {
                name,
                price,
                description,
                userId: userId
            }
        });

        return NextResponse.json({ message: 'Produto atualizado!' });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update product' }, {
            status: 400
        });
    }
}

