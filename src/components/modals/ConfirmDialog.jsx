import Modal from './Modal';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="text-sm text-zinc-300">{description}</p>
      <div className="mt-4 flex justify-end gap-2">
        <SecondaryButton onClick={onCancel}>Cancelar</SecondaryButton>
        <PrimaryButton onClick={onConfirm}>Confirmar</PrimaryButton>
      </div>
    </Modal>
  );
}
