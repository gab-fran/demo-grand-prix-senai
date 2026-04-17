import { useState } from 'react';
import Modal from './Modal';
import Input from '../forms/Input';
import Select from '../forms/Select';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

export default function BlockRoadModal({ open, onClose, roads, onBlock }) {
  const [formData, setFormData] = useState({
    roadName: '',
    reason: '',
    startTime: '',
    endTime: '',
    isScheduled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBlock(formData);
    onClose();
  };

  const roadOptions = [
    { value: '', label: 'Selecione uma via' },
    ...roads.map((r) => ({ value: r.name, label: r.name })),
  ];

  return (
    <Modal open={open} title="Bloquear Via" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Via"
          value={formData.roadName}
          onChange={(e) => setFormData({ ...formData, roadName: e.target.value })}
          options={roadOptions}
          required
        />

        <Input
          label="Motivo"
          placeholder="Ex: Manutenção Civil, Limpeza, Acidente..."
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="isScheduled"
            checked={formData.isScheduled}
            onChange={(e) => setFormData({ ...formData, isScheduled: e.target.checked })}
            className="h-4 w-4 rounded border-line bg-app text-primary focus:ring-primary"
          />
          <label htmlFor="isScheduled" className="text-sm text-zinc-300">
            Agendar bloqueio futuro
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={formData.isScheduled ? 'Início Agendado' : 'Início'}
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
          <Input
            label="Previsão de Término"
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <SecondaryButton type="button" onClick={onClose}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit">Confirmar Bloqueio</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
