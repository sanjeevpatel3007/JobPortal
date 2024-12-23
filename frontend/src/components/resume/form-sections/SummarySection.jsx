import React from 'react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Wand2 } from 'lucide-react';

const SummarySection = ({
  summary,
  setSummary,
  generateResumeSummary,
  loading,
  aiLoading
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Professional Summary
      </h2>
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          onClick={generateResumeSummary}
          disabled={loading || aiLoading}
          className="w-full"
        >
          <Wand2 className={`w-4 h-4 mr-2 ${loading || aiLoading ? 'animate-spin' : ''}`} />
          Generate Professional Summary
        </Button>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Your professional summary will appear here..."
          className="min-h-[200px]"
        />
      </div>
    </section>
  );
};

export default SummarySection; 