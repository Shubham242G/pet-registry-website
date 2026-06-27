import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {

    console.log("========== PROXY START ==========");


    const token = req.headers.get('authorization');

    console.log("TOKEN", token);

    const body = await req.json();

    console.log("BODY", body);


    
    console.log("📦 Payment proxy received:", {
      petId: body.petId,
      amount: body.amount,
      amountType: typeof body.amount,
    });
    
    // Validate amount
    let amount = body.amount;
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
    }
    
    if (isNaN(amount) || amount <= 0) {
      console.error("❌ Invalid amount:", body.amount);
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid amount: ${body.amount}` 
        },
        { status: 400 }
      );
    }
    
    const payload = {
      ...body,
      amount: amount,
      tagDeliveryCost: Number(body.tagDeliveryCost) || 0,
    };

    const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';
    
    console.log(`🔄 Forwarding to: ${BACKEND_URL}/api/payment/create-order`);
    console.log("📦 Payload:", JSON.stringify(payload, null, 2));
    
    console.log("BACKEND URL", BACKEND_URL);
    const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
      body: JSON.stringify(payload),
    });

    console.log("STATUS", response.status);



    
    const text = await response.text();

console.log("RAW BACKEND RESPONSE");
console.log(text);

const data = JSON.parse(text);
    
    if (!response.ok) {
      console.error("❌ Backend error:", {
        status: response.status,
        statusText: response.statusText,
        data: data,
      });
      
      // Return the full error from backend
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || data.details || 'Backend payment error',
          details: data.details || null,
          statusCode: data.statusCode || response.status
        },
        { status: response.status }
      );
    }
    
    console.log("✅ Order created successfully");
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create order' 
      },
      { status: 500 }
    );
  }
}