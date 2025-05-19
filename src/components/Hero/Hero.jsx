import React, { useState } from 'react';
import MapView from '../MapView/MapView'; // MapView.jsx olarak adlandırılmış dosya

const tasks = [
  { id: 1, title: 'Bölge A’yı Tara', status: 'Aktif' },
  { id: 2, title: 'Batarya Durumunu Kontrol Et', status: 'Tamamlandı' },
  { id: 3, title: 'Yasaklı Alan Sınırlarını Güncelle', status: 'Beklemede' },
  { id: 4, title: 'Otonom Şarja Git', status: 'Aktif' },
  { id: 5, title: 'Yeni Görev Al', status: 'Beklemede' },
  { id: 6, title: 'RFID Etiketlerini Tara', status: 'Tamamlandı' },
  { id: 7, title: 'Bölge A’yı Tara', status: 'Aktif' },
  { id: 8, title: 'Batarya Durumunu Kontrol Et', status: 'Tamamlandı' },
  { id: 9, title: 'Yasaklı Alan Sınırlarını Güncelle', status: 'Beklemede' },
  { id: 10, title: 'Otonom Şarja Git', status: 'Aktif' },
  { id: 11, title: 'Yeni Görev Al', status: 'Beklemede' },
  { id: 12, title: 'RFID Etiketlerini Tara', status: 'Tamamlandı' },
];

const logs = [
  '12:45 - Görev 1 tamamlandı',
  '12:47 - Yeni görev atandı',
  '12:49 - Batarya %20\'ye düştü',
  '12:51 - Harita güncellendi',
  '12:53 - Yasaklı bölgeye giriş denemesi',
  '12:55 - Robot otonom şarja yönlendirildi',
  '12:57 - RFID okuma tamamlandı',
  '13:00 - Görev 2 beklemede',
  '13:02 - Sensör uyarısı',
  '13:05 - Görev başarıyla tamamlandı',
];

const robotInfo = {
  name: 'RobotX-01',
  status: 'Görevde',
  battery: 19,
  temperature: 42,
  position: { x: 12.4, y: 8.9 },
  mission: 'Bölge A’yı Tara',
  speed: 1.2,
  isCharging: false,
};

const Hero = () => {
  const [newTask, setNewTask] = useState({
    title: '',
    x: '',
    y: '',
    priority: 'Orta',
    description: '',
  });

  const handleClick = (task) => {
    console.log(`Tıklanan görev: ${task.title}`);
  };

  return (
    <section className="h-[calc(100vh-64px)] bg-gray-100">
      <div className="h-full container mx-auto p-4 grid grid-cols-4 grid-rows-2 gap-4">
        {/* Harita */}
        <div className="col-span-2 row-span-2 bg-gray-200 rounded shadow overflow-hidden">
          <MapView onMapClick={(coords) => {
            console.log("Haritada tıklanan konum:", coords);
            setNewTask((prev) => ({ ...prev, x: coords.lat.toFixed(4), y: coords.lng.toFixed(4) }));
          }} />
        </div>

        {/* Görev Listesi */}
        <div className="bg-gray-300 rounded shadow overflow-hidden flex flex-col">
          <div className="p-3 border-b border-gray-400 font-semibold text-center">
            Görev Listesi
          </div>
          <div className="overflow-y-auto p-2 space-y-2 flex-1">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => handleClick(task)}
                className="w-full bg-white rounded p-2 text-left shadow hover:bg-primary/55 transition duration-200"
              >
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-600">Durum: {task.status}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Robot Detayları */}
        <div className="bg-gray-300 rounded shadow flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-400 font-semibold text-center">
            Robot Detayları
          </div>
          <div className="p-3 text-sm space-y-2 flex-1 text-gray-800">
            <div><strong>İsim:</strong> {robotInfo.name}</div>
            <div><strong>Durum:</strong> {robotInfo.status}</div>
            <div>
              <strong>Şarj:</strong>
              <span className={`ml-1 font-medium ${robotInfo.battery < 20 ? 'text-red-500' : 'text-green-600'}`}>
                %{robotInfo.battery}
              </span>
            </div>
            <div><strong>Sıcaklık:</strong> {robotInfo.temperature}°C</div>
            <div><strong>Konum:</strong> X: {robotInfo.position.x.toFixed(1)} / Y: {robotInfo.position.y.toFixed(1)}</div>
            <div><strong>Aktif Görev:</strong> {robotInfo.mission}</div>
            <div><strong>Hız:</strong> {robotInfo.speed} m/s</div>
            <div>
              <strong>Şarj Durumu:</strong>
              <span className={`ml-1 ${robotInfo.isCharging ? 'text-blue-600' : 'text-gray-600'}`}>
                {robotInfo.isCharging ? 'Şarj oluyor' : 'Değil'}
              </span>
            </div>
          </div>
        </div>

        {/* Log'lar ve Olaylar */}
        <div className="bg-gray-300 rounded shadow flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-400 font-semibold text-center">
            Log'lar ve Olaylar
          </div>
          <div className="overflow-y-auto p-2 space-y-2 flex-1 text-sm text-gray-700">
            {logs.map((log, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded shadow-sm cursor-default select-none"
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Görev Oluşturma */}
        <div className="bg-gray-300 rounded shadow flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-400 font-semibold text-center">
            Görev Oluşturma
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Yeni görev oluşturuldu:', newTask);
              setNewTask({
                title: '',
                x: '',
                y: '',
                priority: 'Orta',
                description: '',
              });
            }}
            className="p-3 space-y-2 text-sm flex-1 text-gray-800"
          >
            <div>
              <label className="block font-medium mb-1">Görev Başlığı</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Örn: A'dan B'ye Yük Taşı"
                className="w-full px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Bölge</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newTask.x}
                  onChange={(e) => setNewTask({ ...newTask, x: e.target.value })}
                  placeholder="A"
                  className="w-1/2 px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  value={newTask.y}
                  onChange={(e) => setNewTask({ ...newTask, y: e.target.value })}
                  placeholder="B"
                  className="w-1/2 px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Yapılacak İş</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Yük Taşıma</option>
                <option>Gitmek</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Açıklama</label>
              <textarea
                rows="2"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Detaylı görev açıklaması..."
                className="w-full px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-1 rounded hover:bg-primary/80 transition duration-200"
              >
                Görevi Oluştur
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
