'use client';
export default function Chat() {
    const chatRooms = [
      { id: 1, name: "Alice Durand", lastMessage: "Salut, comment ça va ?", time: "10:30" },
      { id: 2, name: "Bob Martin", lastMessage: "On se voit demain ?", time: "Hier" },
      { id: 3, name: "Claire Dubois", lastMessage: "Merci pour ton aide !", time: "Lun" },
      { id: 4, name: "David Lefebvre", lastMessage: "J'ai envoyé le document.", time: "07/05" },
    ]
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes conversations</h1>
        <div className="space-y-4">
          {chatRooms.map((room) => (
            <div key={room.id} className="bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center p-4 space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-700">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${room.name}`}
                    alt={room.name}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{room.name}</div>
                  <div className="text-sm text-gray-500">{room.lastMessage}</div>
                </div>
                <div className="text-xs text-gray-500">{room.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  